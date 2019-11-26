import { Car, ParkingLot } from '../js/parkingLot';

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

    const parkingTicket = parkingLot.park(car);

    expect(parkingTicket).toBeFalsy();
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

    const pickedCar = parkingLot.pick('InvalidTicket');

    expect(pickedCar).toBe(false);
  });
});
