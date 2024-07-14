class Beds {
  #FlatBeds;
  #ReclinerBeds;
  constructor() {
    this.#FlatBeds = 80;
    this.#ReclinerBeds = 100;
  }
  getFlatbeds() {
    return this.#FlatBeds;
  }
  isFlatbedAvailable(beds) {
    return this.#FlatBeds >= beds;
  }
  setFlatbeds(beds) {
    return (this.#FlatBeds = this.#FlatBeds - beds);
  }

  getReclinerBeds() {
    return this.#ReclinerBeds;
  }
  isReclinerBedsAvailable(beds) {
    return this.#ReclinerBeds >= beds;
  }
  setReclinerBeds(beds) {
    return (this.#ReclinerBeds = this.#ReclinerBeds - beds);
  }
}
class Hospital extends Beds {
  #NormalRoom;
  #OxygenRoom;
  #ICURoom;
  #Equipments;
  static #instance;
  constructor() {
    super();
    this.#OxygenRoom = 50;
    this.#NormalRoom = 50;
    this.#ICURoom = 20;
    this.#Equipments = new Equipments();
  }
  static instance() {
    if (!this.#instance) {
      this.#instance = new Hospital();
    }

    return this.#instance;
  }

  getNormalRoom() {
    return this.#NormalRoom;
  }
  isNormalRoomAvailable() {
    return this.#NormalRoom > 0;
  }
  setNormalRoom(val) {
    this.#NormalRoom -= val;
  }

  bookNormalRoom() {
    if (
      this.isFlatbedAvailable(1) &&
      this.#Equipments.isMaskAvailable(2) &&
      this.isNormalRoomAvailable()
    ) {
      this.setFlatbeds(1);
      this.#Equipments.setNormalMask(2);
      this.setNormalRoom(1);
      let res = {
        NormalRooms:
          this.getNormalRoom() > 0
            ? this.getNormalRoom() + " (depending upon resources allocated)"
            : "N/A",
        OxygenRooms:
          this.getOxygenRoom() > 0
            ? this.getOxygenRoom() + " (depending upon resources allocated)"
            : "N/A",
        IcuRooms:
          this.getIcuRooms() > 0
            ? this.getIcuRooms() + " (depending upon resources allocated)"
            : "N/A",
      };
      return {
        status: true,
        msg: `01 Normal room (1 flat bed + 2 normal masks.) reserved.`,
        res,
      };
    } else {
      let res = {
        NormalRooms: "N/A",
        OxygenRooms:
          this.getOxygenRoom() > 0
            ? this.getOxygenRoom() + " (depending upon resources allocated)"
            : "N/A",
        IcuRooms:
          this.getIcuRooms() > 0
            ? this.getIcuRooms() + " (depending upon resources allocated)"
            : "N/A",
      };
      return {
        status: false,
        msg: "Sorry, no rooms could be reserved",
        res,
      };
    }
  }

  getOxygenRoom() {
    return this.#OxygenRoom;
  }
  isOxygenRoomAvailable() {
    return this.#OxygenRoom > 0;
  }

  setOxygenRoom(val) {
    return (this.#OxygenRoom -= val);
  }

  bookOxygenRoom() {
    if (
      this.isOxygenRoomAvailable() &&
      this.#Equipments.isOxygenCylinderAvailable(2) &&
      this.isReclinerBedsAvailable(1) &&
      this.#Equipments.isNonrebreathermasksAvailable(2)
    ) {
      this.#Equipments.setOxygenCylinder(2);
      this.#Equipments.setNonrebreathermasks(2);
      this.setReclinerBeds(1);
      this.setOxygenRoom(1);
      let res = {
        NormalRooms:
          this.getNormalRoom() > 0
            ? this.getNormalRoom() + " (depending upon resources allocated)"
            : "N/A",
        OxygenRooms:
          this.getOxygenRoom() > 0
            ? this.getOxygenRoom() + " (depending upon resources allocated)"
            : "N/A",
        IcuRooms:
          this.getIcuRooms() > 0
            ? this.getIcuRooms() + " (depending upon resources allocated)"
            : "N/A",
      };
      return {
        status: true,
        msg: `01 Oxygen room (with : 2 oxygen cylinders + 1 recliner bed + 2 non rebreather masks) reserved.`,
        res,
      };
    } else {
      let res = {
        NormalRooms:
          this.getNormalRoom() > 0
            ? this.getNormalRoom() + " (depending upon resources allocated)"
            : "N/A",
        OxygenRooms: "N/A",
        IcuRooms:
          this.getIcuRooms() > 0
            ? this.getIcuRooms() + " (depending upon resources allocated)"
            : "N/A",
      };
      return {
        status: false,
        msg: "Sorry, no rooms could be reserved",
        res,
      };
    }
  }

  getIcuRooms() {
    return this.#ICURoom;
  }
  setIcuRoom(val) {
    this.#ICURoom -= val;
  }
  isIcuRoomAvailable() {
    return this.#ICURoom > 0;
  }
  bookIcuRoom() {
    if (
      this.#Equipments.isVentilatorAvailable(1) &&
      this.#Equipments.isOxygenCylinderAvailable(1) &&
      this.isFlatbedAvailable(1) &&
      this.isIcuRoomAvailable()
    ) {
      this.#Equipments.setVentilator(1);
      this.#Equipments.setOxygenCylinder(1);
      this.setReclinerBeds(1);
      this.setIcuRoom(1);
      let res = {
        NormalRooms:
          this.getNormalRoom() > 0
            ? this.getNormalRoom() + " (depending upon resources allocated)"
            : "N/A",
        OxygenRooms:
          this.getOxygenRoom() > 0
            ? this.getOxygenRoom() + " (depending upon resources allocated)"
            : "N/A",
        IcuRooms:
          this.getIcuRooms() > 0
            ? this.getIcuRooms() + " (depending upon resources allocated)"
            : "N/A",
      };
      return {
        status: true,
        msg: `01 ICU room (with 1 ventilator + 1 recliner bed + 1 oxygen cylinder) reserved.`,
        res,
      };
    } else {
      let res = {
        NormalRooms:
          this.getNormalRoom() > 0
            ? this.getNormalRoom() + " (depending upon resources allocated)"
            : "N/A",
        IcuRooms: "N/A",
        OxygenRooms:
          this.getOxygenRoom() > 0
            ? this.getOxygenRoom() + " (depending upon resources allocated)"
            : "N/A",
      };
      return {
        status: false,
        msg: "Sorry, no rooms could be reserved",
        res,
      };
    }
  }
}

class Equipments {
  #Ventilator;
  #OxygenCylinder;
  #NormalMasks;
  #Nonrebreathermasks;
  constructor() {
    this.#Ventilator = 16;
    this.#OxygenCylinder = 110;
    this.#NormalMasks = 200;
    this.#Nonrebreathermasks = 120;
  }

  getMask() {
    return this.#NormalMasks;
  }
  isMaskAvailable(val) {
    return this.#NormalMasks >= val;
  }
  setNormalMask(val) {
    this.#NormalMasks = this.#NormalMasks - val;
  }

  getVentilator() {
    return this.#Ventilator;
  }
  isVentilatorAvailable(val) {
    return this.#Ventilator >= val;
  }
  setVentilator(val) {
    this.#Ventilator = this.#Ventilator - val;
  }

  getOxygenCylinder() {
    return this.#OxygenCylinder;
  }
  isOxygenCylinderAvailable(val) {
    return this.#OxygenCylinder >= val;
  }
  setOxygenCylinder(val) {
    this.#OxygenCylinder = this.#OxygenCylinder - val;
  }

  getNonrebreathermasks() {
    return this.#Nonrebreathermasks;
  }
  isNonrebreathermasksAvailable(val) {
    return this.#Nonrebreathermasks >= val;
  }
  setNonrebreathermasks(val) {
    this.#Nonrebreathermasks -= val;
  }
}

let H = Hospital.instance();

let reservedRoomData = [];

function submitRoomRequest(event) {
  // console.log(H);
  event.preventDefault();
  let val = document.getElementById("rooms").value;

  if (val == "OxygenRoom") {
    let res = H.bookOxygenRoom();
    reservedRoomData = [...reservedRoomData, res];
    updateDom();
  } else if (val == "IcuRoom") {
    let res = H.bookIcuRoom();
    reservedRoomData = [...reservedRoomData, res];
    updateDom();
  } else {
    let res = H.bookNormalRoom();
    reservedRoomData = [...reservedRoomData, res];
    updateDom();
  }
}

function updateDom() {
  let container = document.querySelector(".responseDiv");
  container.classList.add("scroll");
  container.innerHTML = "";

  reservedRoomData.forEach((ele) => {
    console.log(ele);
    let div = document.createElement("div");

    div.className = "card";
    let msgPElement = document.createElement("p");
    msgPElement.innerHTML = ele.msg;
    if (ele.status) {
      msgPElement.className = "success";
    } else {
      msgPElement.className = "failed";
    }
    div.append(msgPElement);

    let remainingAvailability = document.createElement("div");

    let p = document.createElement("p");
    p.innerHTML = "Remaining availability:";

    let normalRoomsElement = document.createElement("p");
    normalRoomsElement.innerHTML = `Normal Rooms: ${ele.res.NormalRooms} `;

    let OxygenRoomsElement = document.createElement("p");
    OxygenRoomsElement.innerHTML = `Oxygen Rooms: ${ele.res.OxygenRooms} `;

    let IcuRoomsElement = document.createElement("p");
    IcuRoomsElement.innerHTML = `ICU: ${ele.res.IcuRooms} `;

    remainingAvailability.append(p, normalRoomsElement, OxygenRoomsElement, IcuRoomsElement);

    div.append(remainingAvailability);

    container.append(div);
  });
}
