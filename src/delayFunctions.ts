
// コールバック関数の型定義
type TCallback = ()=>void

// インターフェイス
export interface IDelayFunctions {
    add(f: TCallback ): void
    promise(): Promise<unknown>
}

// クラス
export default class DelayFunctions implements IDelayFunctions {

    // クラス変数
    delay: number = 1000
    stacks: TCallback[]=[]
    resolver: ()=>void=()=>{}

    // コンストラクタ
    constructor(delay: number) {
        this.delay = delay
    }

    // コールバックの追加
    add(cb: TCallback) {
        this.stacks.push(cb)
    }

    // FIFOでコールバックを実行
    run() {
        if(this.stacks.length == 0) {
            this.resolver()
            return
        }
        const fnc = <TCallback>this.stacks.shift()
        setTimeout(()=>{
            fnc()
            this.run()
        }, this.delay)
     }

     // Promiseを返して実行
    promise() {
        this.run()
        return new Promise((resolve,reject)=>{
            this.resolver=()=>{ resolve(0) }
        })
   }

};