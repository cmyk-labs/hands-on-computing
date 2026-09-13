import { Meter, label } from "ts-b-meter";
const meter = new Meter(10);
console.log("installed-consumer", label(meter.add(2)));
