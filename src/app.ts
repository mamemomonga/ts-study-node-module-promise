import DelayFunctions from "./delayFunctions"

class App {
    action1() {
        const de = new DelayFunctions(1000)
        de.add(()=>{ console.log("Hello 1") })
        de.add(()=>{ console.log("Hello 2") })
        de.add(()=>{ console.log("Hello 3") })
        de.add(()=>{ console.log("Hello 4") })
        de.add(()=>{ console.log("Hello 5") })
        return de.promise()
    }
    async action2() {
        const sayAndWait=(m: string)=>{
            return new Promise((resolve,reject)=>{
                console.log(m)
                setTimeout(()=>{ resolve(1) },1000)
            })
        }
        await sayAndWait("hello 1")
        await sayAndWait("hello 2")
        await sayAndWait("hello 3")
        await sayAndWait("hello 4")
        await sayAndWait("hello 5")
    }
    async run() {
        await this.action1()
        await this.action2()
        console.log("Finish all actions")
    }
}

new App().run()

