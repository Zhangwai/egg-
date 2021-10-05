import 'egg';

declare module 'egg' {
    interface Application {
        mysql: any,
        redis:any
    }
}
