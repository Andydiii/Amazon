// 17a
export class Car {
    #brand;
    #model;
    trunkOpened = false;
    speed = 0;

    constructor(carObj) {
        this.brand = carObj.brand;
        this.model = carObj.model;
    }

    displayInfo() {
        console.log(`brand: ${this.#brand}, model: ${this.#model}, speed: ${this.speed} km/h, trunk status: ${this.trunkOpened ? 'Opened' : 'Closed'}`);
    }

    go() {
        if (this.trunkOpened === false && this.speed + 5 <= 200) {
            this.speed += 5;
        } else if (this.trunkOpened) {
            console.log('Your trunck is still open, dont drive!');
        } else {
            console.log('Your speed is too fast');
        }
    }
    
    brake() {
        if (this.speed - 5 >= 0) {
            this.speed -= 5;
        }
    }

    openTrunk() {
        if (this.speed === 0) {
            this.trunkOpened = true;
        } else {
            console.log("you are driving! You cannot open Trunk");
        }
    }

    closeTrunk() {
        this.trunkOpened = false;
    }
    
    reset() {
        this.speed = 0;
        this.trunkOpened = false;
    }
}

export const newToyota = new Car({
    brand: 'Toyota',
    model: 'Corolla'
})

export const newTesla = new Car({
    brand:'Tesla',
    model: 'Model 3'
})

export class RaceCar extends Car{
    acceleration;

    constructor(raceCarObj) {
        super(raceCarObj);
        this.acceleration = raceCarObj.acceleration;
    }

    go() {
        if (this.speed + this.acceleration > 300) {
            this.speed = 300;
        }
    }

    openTrunk() {
        console.log('Race car do not have a trunk');
    }

    closeTrunk() {
        console.log('Race car do not have a trunk');
    }
}

const Porche = new RaceCar({
    brand: 'porche',
    model: '911',
    acceleration: 15
});

