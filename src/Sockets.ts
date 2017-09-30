import Emitter from './Emitter';

export default class Sockets {
    public _listeners: any;
    public vm: any;

    constructor(vm: any) {
      this.vm = vm;
      this._listeners = {};
    }

    get listeners(): any {
        return this._listeners;
    }

    public listener(key: string, value?: any): void {
      if (!value) {
        if (this._listeners[key]) {
          Emitter.removeListener(key, this._listeners[key], this.vm);
          delete this._listeners[key];
        }
        return;
      }

      Emitter.addListener(key, value, this.vm);
      this._listeners[key] = value;
    }
}
