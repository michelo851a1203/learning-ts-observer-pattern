interface observerType {
    id: string;
    getID():string;
    notify(message: string):void;
}

const coreNotify = (id: string,message : string) =>  {
    console.log(`observer (${id}) is notified message is : ${message}`);
}

const observerA: observerType = {
    id: "observerA",
    getID() { return this.id },
    notify(message: string) {
        coreNotify(this.id, message);
    },
}

const observerB: observerType = {
    id: "observerB",
    getID() { return this.id },
    notify(message: string) {
        coreNotify(this.id, message);
    },
}

const subject = {
    message: "",
    subjectStatus: false,
    observerGroup: <observerType[]>[],
    notifyAll() {
        subject.observerGroup.forEach((obs: observerType) => {
            obs.notify(subject.message);
        })
    },
    register(obs: observerType) {
        subject.observerGroup.push(obs);
    },
    deRegister(obs: observerType) {
        subject.observerGroup = subject.observerGroup
            .filter((observerItem: observerType) => observerItem.getID() !== obs.getID());
    },
    setNotifyMessage(message: string) {
        this.message = message;
    },
    changeSubjectStatus() {
        this.subjectStatus = !this.subjectStatus;
        this.notifyAll();
    }
}

subject.setNotifyMessage("testing message");

subject.register(observerA);
subject.register(observerB);

// test notify
subject.changeSubjectStatus();
