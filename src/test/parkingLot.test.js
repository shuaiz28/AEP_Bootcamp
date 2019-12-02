import { Car, ParkingLot, ParkingBoy, SmartParkingBoy, ParkingLotFullError, NoAvailableParkingLotError, InvalidParkingTicketError } from '../js/parkingLot';

describe('Parking Lot', () => {
  it('should successfully park the car when there is available space in the parking lot', () => {
    const parkingLot = new ParkingLot(1);
    const car = new Car('京A 11111');

    const parkingTicket = parkingLot.park(car);

    expect(parkingTicket).toBeTruthy();
  });
  it('should return the available space in the parking lot', () => {
    const availableSpace = 10;
    const parkingLot = new ParkingLot(availableSpace);

    expect(parkingLot.getAvailableSpace()).toBe(availableSpace);
  });
  it('should reduce the available space in the parking lot when a car is successfully parked', () => {
    const availableSpace = 10;
    const parkingLot = new ParkingLot(availableSpace);
    const car = new Car('京A 11111');
    const expectedAvailableSpace = availableSpace - 1;

    parkingLot.park(car);

    expect(parkingLot.getAvailableSpace()).toBe(expectedAvailableSpace);
  });
  it('should return 0 when no available space in the parking lot.', () => {
    const availableSpace = 1;
    const parkingLot = new ParkingLot(availableSpace);
    const car = new Car('京A 11111');
    const expectedAvailableSpace = 0;

    parkingLot.park(car);

    expect(parkingLot.getAvailableSpace()).toBe(expectedAvailableSpace);
  });
  it('should reduce the available space in the parking lot when multiple cars are successfully parked', () => {
    const availableSpace = 10;
    const parkingLot = new ParkingLot(availableSpace);
    const car1 = new Car('京A 11111');
    const car2 = new Car('京A 12345');
    const expectedAvailableSpace = availableSpace - 2;

    parkingLot.park(car1);
    parkingLot.park(car2);

    expect(parkingLot.getAvailableSpace()).toBe(expectedAvailableSpace);
  });
  it('should not park the car if there is no space in the parking lot', () => {
    const parkingLot = new ParkingLot(0);
    const car = new Car('京A 11111');

    expect(() => parkingLot.park(car)).toThrow(ParkingLotFullError);
  });
  it('should successfully pick the car when there is a valid parking ticket', () => {
    const parkingLot = new ParkingLot(1);
    const car = new Car('京A 11111');
    const parkingTicket = parkingLot.park(car);

    const pickedCar = parkingLot.pick(parkingTicket);

    expect(pickedCar).toEqual(car);
  });
  it('should increase the available parking space when successfully pick the car', () => {
    const parkingLot = new ParkingLot(1);
    const car = new Car('京A 11111');
    const parkingTicket = parkingLot.park(car);

    parkingLot.pick(parkingTicket);

    expect(parkingLot.getAvailableSpace()).toEqual(1);
  });
  it('should not pick the car when there is a invalid parking ticket', () => {
    const parkingLot = new ParkingLot(1);
    const car = new Car('京A 11111');
    parkingLot.park(car);

    expect(() => parkingLot.pick('InvalidTicket')).toThrow(InvalidParkingTicketError);
  });
});

describe('Parking boy', () => {
  it('should park the car to the parking lot by the boy when there is only one parking lot', () => {
    const parkingLot = new ParkingLot(10);
    const parkingBoy = new ParkingBoy([parkingLot]);
    const car = new Car('京A 11111');

    parkingBoy.park(car);

    expect(parkingLot.getAvailableSpace()).toBe(9);
  });

  it('should not park the car to the parking lot by the boy when the parking lot is full', () => {
    const parkingLot = new ParkingLot(0);
    const parkingBoy = new ParkingBoy([parkingLot]);
    const car = new Car('京A 11111');

    expect(() => parkingBoy.park(car)).toThrow(NoAvailableParkingLotError);
  });

  it('should park the car to the parking lot with second higher priority by the boy when the first one is full', () => {
    const parkingLot1 = new ParkingLot(1);
    const parkingLot2 = new ParkingLot(10);
    const parkingBoy = new ParkingBoy([parkingLot1, parkingLot2]);
    const car1 = new Car('京A 111111');
    const car2 = new Car('京A 111112');

    parkingBoy.park(car1);
    parkingBoy.park(car2);

    expect(parkingLot1.getAvailableSpace()).toBe(0);
    expect(parkingLot2.getAvailableSpace()).toBe(9);
  });

  it('should park the car to the parking lot with higher priority by the boy when there are multiple parking lot', () => {
    const parkingLot1 = new ParkingLot(10);
    const parkingLot2 = new ParkingLot(10);
    const parkingBoy = new ParkingBoy([parkingLot1, parkingLot2]);
    const car = new Car('京A 111111');

    parkingBoy.park(car);

    expect(parkingLot1.getAvailableSpace()).toBe(9);
    expect(parkingLot2.getAvailableSpace()).toBe(10);
  });

  it ('should pick the car from the parking lot by the boy when there is a valid ticket', () => {
    const parkingLot = new ParkingLot(10);
    const parkingBoy = new ParkingBoy([parkingLot]);
    const car = new Car('京A 111111');

    const parkingTicket = parkingBoy.park(car);

    const pickerCar = parkingBoy.pick(parkingTicket);

    expect(pickerCar).toEqual(car);
  });

  it ('should pick the car from the corresponding parking lot by the boy when there is a valid ticket', () => {
    const parkingLot1 = new ParkingLot(0);
    const parkingLot2 = new ParkingLot(10);
    const parkingBoy = new ParkingBoy([parkingLot1, parkingLot2]);
    const car = new Car('京A 111111');

    const parkingTicket = parkingBoy.park(car);

    const pickerCar = parkingBoy.pick(parkingTicket);

    expect(pickerCar).toEqual(car);
  });

  it ('should not pick the car by the boy when there is a invalid ticket', () => {
    const parkingLot1 = new ParkingLot(0);
    const parkingLot2 = new ParkingLot(10);
    const parkingBoy = new ParkingBoy([parkingLot1, parkingLot2]);
    const car = new Car('京A 111111');
    parkingBoy.park(car);

    expect(() => parkingBoy.pick('invalidParkingTicket')).toThrow(InvalidParkingTicketError);
  });
});

describe('Smart boy', () => {
  it('should park the car to the parking lot by the boy when there is only one parking lot', () => {
    const parkingLot = new ParkingLot(10);
    const smartParkingBoy = new SmartParkingBoy([parkingLot]);
    const car = new Car();

    smartParkingBoy.park(car);

    expect(parkingLot.getAvailableSpace()).toBe(9);
  });

  it('should not park the car to the parking lot by the boy when the parking lot is full', () => {
    const parkingLot = new ParkingLot(0);
    const smartParkingBoy = new SmartParkingBoy([parkingLot]);
    const car = new Car();

    expect(() => smartParkingBoy.park(car)).toThrow(NoAvailableParkingLotError);
  });

  it('should park the car to the parking lot with second higher priority by the boy when the first one is full', () => {
    const parkingLot1 = new ParkingLot(1);
    const parkingLot2 = new ParkingLot(1);
    const smartParkingBoy = new SmartParkingBoy([parkingLot1, parkingLot2]);
    const car1 = new Car();
    const car2 = new Car();

    smartParkingBoy.park(car1);
    expect(parkingLot1.getAvailableSpace()).toBe(0);
    smartParkingBoy.park(car2);

    expect(parkingLot2.getAvailableSpace()).toBe(0);
  });

  it('should park the car to the parking lot with higher priority by the boy when there are multiple parking lot', () => {
    const parkingLot1 = new ParkingLot(10);
    const parkingLot2 = new ParkingLot(10);
    const smartParkingBoy = new SmartParkingBoy([parkingLot1, parkingLot2]);
    const car = new Car();

    smartParkingBoy.park(car);

    expect(parkingLot1.getAvailableSpace()).toBe(9);
    expect(parkingLot2.getAvailableSpace()).toBe(10);
  });

  it ('should pick the car from the parking lot by the boy when there is a valid ticket', () => {
    const parkingLot = new ParkingLot(10);
    const smartParkingBoy = new SmartParkingBoy([parkingLot]);
    const car = new Car();

    const parkingTicket = smartParkingBoy.park(car);

    const pickerCar = smartParkingBoy.pick(parkingTicket);

    expect(pickerCar).toEqual(car);
  });

  it ('should pick the car from the corresponding parking lot by the boy when there is a valid ticket', () => {
    const parkingLot1 = new ParkingLot(0);
    const parkingLot2 = new ParkingLot(10);
    const smartParkingBoy = new SmartParkingBoy([parkingLot1, parkingLot2]);
    const car = new Car();

    const parkingTicket = smartParkingBoy.park(car);

    const pickerCar = smartParkingBoy.pick(parkingTicket);

    expect(pickerCar).toEqual(car);
  });

  it ('should not pick the car by the boy when there is a invalid ticket', () => {
    const parkingLot1 = new ParkingLot(0);
    const parkingLot2 = new ParkingLot(10);
    const smartParkingBoy = new SmartParkingBoy([parkingLot1, parkingLot2]);
    const car = new Car();
    smartParkingBoy.park(car);

    expect(() => smartParkingBoy.pick('invalidParkingTicket')).toThrow(InvalidParkingTicketError);
  });

  it('should park the car to the parking lot with more available spaces when there are multiple parking lot', () => {
    const parkingLot1 = new ParkingLot(5);
    const parkingLot2 = new ParkingLot(10);
    const smartParkingBoy = new SmartParkingBoy([parkingLot1, parkingLot2]);
    const car = new Car();

    smartParkingBoy.park(car);

    expect(parkingLot1.getAvailableSpace()).toBe(5);
    expect(parkingLot2.getAvailableSpace()).toBe(9);
  });

  it('should park the car to the parking lot with highest priority when there are multiple parking lot with the same available spaces', () => {
    const parkingLot1 = new ParkingLot(10);
    const parkingLot2 = new ParkingLot(10);
    const parkingLot3 = new ParkingLot(10);
    const smartParkingBoy = new SmartParkingBoy([parkingLot1, parkingLot2, parkingLot3]);
    const car = new Car();

    smartParkingBoy.park(car);

    expect(parkingLot1.getAvailableSpace()).toBe(9);
    expect(parkingLot2.getAvailableSpace()).toBe(10);
    expect(parkingLot3.getAvailableSpace()).toBe(10);
  });
});
