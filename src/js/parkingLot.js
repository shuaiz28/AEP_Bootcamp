export class ParkingLot {
  constructor(size) {
    this.size = size;
    this.nextTicketNumber = 1;
    this.lotToCarMap = new Map();
  }

  park(car) {
    if (this.getAvailableSpace() <= 0) {
      return false;
    }
    const currentTicketNumber = this.nextTicketNumber;
    this.lotToCarMap.set(currentTicketNumber, car);
    this.nextTicketNumber += 1;
    return currentTicketNumber;
  }

  pick(parkingTicket) {
    const car = this.lotToCarMap.get(parkingTicket);
    if (!car) {
      return false;
    }
    this.lotToCarMap.delete(parkingTicket);
    return car;
  }

  getAvailableSpace() {
    return this.size >= this.lotToCarMap.size ? this.size - this.lotToCarMap.size : 0;
  }
}

export class Car {
  constructor(plateNumber) {
    this.plateNumber = plateNumber;
  }
}

