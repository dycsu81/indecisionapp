
class Person {

    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }

    getGreeting() {
        return `Hi. I am ${this.name}!`;
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`;
    }
}

class Traveler extends Person {
    constructor(name, age, homeLoc) {
        super(name, age);
        this.homeLoc = homeLoc;
    }

    getGreeting() {
        let greeting = super.getGreeting();
        if (this.hasHomeLocation()) {
            greeting += ` I'm visiting from ${this.homeLoc}.`;
        }
        return greeting;
    }
    hasHomeLocation() {
        return !!this.homeLoc;
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }

    getDescription() {
        let description = super.getDescription();
        if (this.hasMajor()) {
            description += ` Their major is ${this.major}.`;
        }
        return description;
    }
    hasMajor() {
        return !!this.major;
    }
}

const homeOwner = new Traveler("Lisa", 100, "125 West 46th. Vancouver , BC");
console.log(homeOwner.getGreeting());

const homeLess = new Traveler("Time", 100);
console.log(homeLess.getGreeting());

const me = new Student('David Su', 37, 'Comp Sci');
console.log(me.getDescription());

const other = new Student();
console.log(other.getDescription());