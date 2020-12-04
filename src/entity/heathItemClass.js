class HealthItemClass {
    id;
    position = {top: 0, bottom: 0, left: 0, right: 0};
    ref;

    constructor(position,ref=null){
        this.id = new Date().getTime();
        this.position = position;
        this.ref = ref;
    }
}

export default HealthItemClass;