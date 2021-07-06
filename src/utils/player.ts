import { Howl, Howler } from 'howler'
import { getTrackDetail } from '../api/track';
interface track {
  id: number;
  ar?: any[];
  al?: any;
  [k: string]: any
}
export default class Player {
  private static instance: Player;

  private _playing: boolean; // 是否正在播放中
  private _progress: number; // 当前播放歌曲的进度
  private _volume: number; // 0 to 1
  private _volumeBeforeMuted: number; // 用于保存静音前的音量

  private _list: track[];// 播放列表
  private _listId: number | null;
  private _current: number; // 当前播放歌曲在播放列表里的index
  private _currentTrack: track | null; // 当前播放歌曲的详细信息

  private _howl: Howl | null;
  private AF: number;


  private constructor(list?: track[], index?: number) {
    this._playing = false;
    this._progress = 0;
    this._volume = 1;
    this._volumeBeforeMuted = 1;
    this._list = list || [];
    this._listId = null;
    this._current = index || 0;
    this._currentTrack = null;
    this._howl = null;
    this.AF = 0;

    Howler.volume(this.volume);
    Howler.usingWebAudio = true;
  }

  public static getPlayer() {
    if (!Player.instance) {
      Player.instance = new Player()
    }
    return Player.instance;
  }
  async _playTrack(index: number = 0, track?: track): Promise<void> {
    this.current = index;
    if (track) {
      this.list = [track];
      this.currentTrack = track;
    } else {
      const currentTrackId = this.list?.[index]?.id
      this.currentTrack = (await getTrackDetail(String(currentTrackId))).songs[0];
    }
    Howler.unload();
    document.title = `Musicease - ${this.currentTrack.name}`
    this.howl = new Howl({
      src: this.music_url,
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
  _playNext(): void {
    if (this.current >= this.list.length - 1) {
      this.current = 0;
    } else {
      this.current++
    }
    this._playTrack(this.current)
  }
  _playPrev(): void {
    if (this.current <= 0) {
      this.current = this.total - 1;
    } else {
      this.current--
    }
    this._playTrack(this.current)
  }
  _pause(): void {
    if (this.howl === null) return;
    this.howl.pause();
  }
  _play(): void {
    if (this.howl === null) return;
    this.howl.play();
  }
  _stop(): void {
    if (this.howl === null) return;
    this.howl.stop()
  }
  _seek(v: number): void {
    this.howl?.seek(v * (this.currentTrack.dt / 1000));
    this.progress = v
  }

  _step(): void {
    if (!this.playing) return;
    if (this.howl === null) return;
    const seek = this.howl.seek();
    if (typeof seek === "number") {
      this.progress = seek / (this.currentTrack.dt / 1000);
    }
    this.AF = requestAnimationFrame(this._step.bind(this));
  }
  _cancelStep(): void {
    cancelAnimationFrame(this.AF)
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
  public get list(): any[] {
    return this._list;
  }
  public set list(v: any[]) {
    this._list = v;
  }
  public get listId(): number | null {
    return this._listId;
  }
  public set listId(v: number | null) {
    this._listId = v;
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
  public get total(): number {
    return this.list.length
  }
  public get music_url(): string {
    return `https://music.163.com/song/media/outer/url?id=${this.currentTrack.id}.mp3`;
  }
}