import Observer from './Observer';
import Sockets from './Sockets';

export default {
    install(Vue: any, connection: any, store: any) {
        if(!connection) {
          throw new Error("[vue-Socket-io] cannot locate connection");
        }

        let observer = new Observer(connection, store);

        Vue.prototype.$socket = observer.Socket;

        Vue.mixin({
            created() {
                let sockets = this.$options['sockets'];

                this.$options.sockets = new Sockets(this);

                if(sockets){
                    Object.keys(sockets).forEach((key) => {
                        this.$options.sockets.listener(key, sockets[key]);
                    });
                }
            },
            beforeDestroy(){
                let sockets = this.$options['sockets'];

                if(sockets){
                    Object.keys(sockets).forEach((key) => {
                      this.$options.sockets.listener(key);
                    });
                }
            }
        });
    }
}
