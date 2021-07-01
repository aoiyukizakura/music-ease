import { Howl, Howler } from 'howler'
import { getTrackDetail } from '../api/track';
interface track {
  id: number;
  ar?: Array<any>;
  al?: any;
  [k: string]: any
}
export default class Player {
  private static instance: Player;

  private MUSIC_URL = (): string =>
    this.list.length ?
      `https://music.163.com/song/media/outer/url?id=${this.list[this.current].id}.mp3` : '';

  private _playing: boolean; // 是否正在播放中
  private _progress: number; // 当前播放歌曲的进度
  private _volume: number; // 0 to 1
  private _volumeBeforeMuted: number; // 用于保存静音前的音量

  private _list: Array<track>;// 播放列表
  private _current: number; // 当前播放歌曲在播放列表里的index
  private _currentTrack: track | null; // 当前播放歌曲的详细信息

  private _howl: Howl | null;
  private AF: number;


  private constructor(list?: Array<track>, index?: number) {
    this._playing = false;
    this._progress = 0;
    this._volume = 1;
    this._volumeBeforeMuted = 1;
    this._list = list || [];
    this._current = index || 0;
    this._currentTrack = null;
    this._howl = null;
    this.AF = 0;

    Howler.volume(this.volume);
    Howler.usingWebAudio = true;
  }

  public static getPlayer() {
    if (!Player.instance) {
      const player = new Player();
      Player.instance = player;
    }
    return Player.instance;
  }
  async _playTrack(id?: number, index?: number): Promise<void> {
    if (!this.MUSIC_URL()) return;
    Howler.unload();
    this.current = index || this.current;
    this.currentTrack = (await getTrackDetail(String(this.list[this.current].id))).songs[0];
    document.title = `Musicease - ${this.currentTrack.al.name}`
    this.howl = new Howl({
      src: [this.MUSIC_URL()],
      html5: true,
      onplay: () => {
        this.playing = true
        this._step();
      },
      onmute: () => {
        this.volumeBeforeMuted = this.volume
      },
      onpause: () => {
        this.playing = false;
        this._cancelStep();
      },
      onstop: () => {
        this.playing = false;
        this._cancelStep();
      },
      onend: () => {
        this._cancelStep();
        this._playNext();
      },
    })
    this.howl.once("loaderror", (err) => {
      console.log(err);
      this._playNext();
    })
    this.howl.play()
  }
  _step(): void {
    if (!this.playing) return;
    if (this.howl === null) return;
    const seek = this.howl.seek()
    if (typeof seek === "number") {
      this.progress = seek / (this.currentTrack.dt / 1000);
    }
    this.AF = requestAnimationFrame(this._step.bind(this));
  }
  _seek(v: number): void {
    this.howl?.seek(v * (this.currentTrack.dt / 1000))
    const seek = this.howl?.seek()
    if (typeof seek === "number") {
      this.progress = seek / (this.currentTrack.dt / 1000);
    }
  }
  _cancelStep(): void {
    cancelAnimationFrame(this.AF)
  }
  _playNext(): void {
    if (this.current >= this.list.length - 1) {
      this.current = 0;
    } else {
      this.current++
    }
    this._playTrack()
  }
  _pause(): void {
    if (this.howl !== null) {
      this.howl.pause();
    }
  }
  _play(): void {
    if (this.howl !== null) {
      this.howl.play();
    }
  }

  public get playing(): boolean {
    return this._playing;
  }
  public set playing(v: boolean) {
    this._playing = v;
  }
  public get progress(): number {
    return this._progress;
  }
  public set progress(v: number) {
    this._progress = v;
  }
  public get volume(): number {
    return this._volume;
  }
  public set volume(v: number) {
    this._volume = v;
    Howler.volume(v);
  }
  public get volumeBeforeMuted(): number {
    return this._volumeBeforeMuted;
  }
  public set volumeBeforeMuted(v: number) {
    this._volumeBeforeMuted = v;
  }
  public get list(): Array<any> {
    return this._list;
  }
  public set list(v: Array<any>) {
    this._list = v;
  }
  public get current(): number {
    return this._current;
  }
  public set current(v: number) {
    this._current = v;
  }
  public get currentTrack(): any {
    return this._currentTrack;
  }
  public set currentTrack(v: any) {
    this._currentTrack = v;
  }
  public get howl(): Howl | null {
    return this._howl;
  }
  public set howl(v: Howl | null) {
    this._howl = v;
  }
}