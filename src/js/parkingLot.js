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

export class ParkingBoy {
  constructor(parkingLots) {
    this.parkingLots = parkingLots;
  }

  park(car) {
    const firstAvailableParkingLot = this.parkingLots.find(parkingLot => parkingLot.getAvailableSpace() > 0);
    if (!firstAvailableParkingLot) {
      return false;
    }
    return firstAvailableParkingLot.park(car);
  }

  pick(parkingTicket) {
    let car;
    this.parkingLots.forEach(parkingLot => {
      car = parkingLot.pick(parkingTicket);
      if (car) {
        return car;
      }
    });
    return car;
  }
}

export class SmartParkingBoy extends ParkingBoy {
  constructor(parkingLots) {
    super(parkingLots);
  }

  park(car) {
    let maxAvaliableSpaceParkingLot = null;

    this.parkingLots.forEach((parkingLot, index) => {
      const availableSpace = parkingLot.getAvailableSpace();
      if (availableSpace > 0
        && (!maxAvaliableSpaceParkingLot || availableSpace > maxAvaliableSpaceParkingLot.availableSpace)) {
        maxAvaliableSpaceParkingLot = {
          index,
          availableSpace,
        }
      }
    });
    if (!maxAvaliableSpaceParkingLot) return false;
    const higherPriorityParkingLot = this.parkingLots[maxAvaliableSpaceParkingLot.index];
    return higherPriorityParkingLot.park(car);
  }
}
