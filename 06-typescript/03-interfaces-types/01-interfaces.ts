// Cannot use in interfaces:  union types
// Objects use interfaces, use types for any other case

interface Person {
    readonly name: string
    readonly age: number
}

interface Identity {
    readonly id: string | number
}

interface User extends Person, Identity {
    readonly email?: string
    role: "admin" | "user" | "editor"
    hello: () => string
    login(): boolean

}

const user: User = {
    id: 1,
    name: "peter",
    age: 10,
    role: "admin",
    hello: () => "hello",
    login: () => true
}


// Declaration merging
interface Hero {
    name: string

}
interface Hero {
    power: string
}

const hero: Hero = {
    name: "peter",
    power: "fly"
}


interface MediaPlayer {
    play(): void
    pause(): void
    stop(): void
}

interface VideoPlayer {
    playVideo(): void
    pauseVideo(): void
    stopVideo(): void
}

class Player implements MediaPlayer, VideoPlayer {
    play() {
        console.log("play")
    },
    pause() {
        console.log("pause")
    },
    stop() {
        console.log("stop")
    },
    playVideo() {
        console.log("play video")
    },
    pauseVideo() {
        console.log("pause video")
    },
    stopVideo() {
        console.log("stop video")
    }
}