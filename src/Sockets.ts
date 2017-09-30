import Emitter from './Emitter';

export default class Sockets {
    private _listeners: any;
    private vm: any;

    constructor(vm: any) {
      this.vm = vm;
    }

    get listeners(): any {
        return this._listeners;
    }

    public listener(key: string, value?: string): void {
      if (!value) {
        delete this._listeners;
        Emitter.removeListener(key, this._listeners[key], this.vm);
        return;
      }

      Emitter.addListener(key, value, this.vm);
      this._listeners[key] = value;
    }
}
