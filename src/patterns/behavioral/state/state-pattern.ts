export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled';

interface OrderState {
  pay: (order: Order) => void;
  ship: (order: Order) => void;
  cancel: (order: Order) => void;
}

class PendingOrderState implements OrderState {
  pay = (order: Order): void => {
    order.setState(new PaidOrderState());
  };

  ship = (): void => {
    throw new Error('An order must be paid before it can be shipped');
  };

  cancel = (order: Order): void => {
    order.setState(new CancelledOrderState());
  };
}

class PaidOrderState implements OrderState {
  pay = (): void => {
    throw new Error('An order has already been paid');
  };

  ship = (order: Order): void => {
    order.setState(new ShippedOrderState());
  };

  cancel = (order: Order): void => {
    order.setState(new CancelledOrderState());
  };
}

class ShippedOrderState implements OrderState {
  pay = (): void => {
    throw new Error('A shipped order cannot be paid again');
  };

  ship = (): void => {
    throw new Error('An order has already been shipped');
  };

  cancel = (): void => {
    throw new Error('A shipped order cannot be cancelled');
  };
}

class CancelledOrderState implements OrderState {
  pay = (): void => {
    throw new Error('A cancelled order cannot be paid');
  };

  ship = (): void => {
    throw new Error('A cancelled order cannot be shipped');
  };

  cancel = (): void => {
    throw new Error('An order has already been cancelled');
  };
}

/** Context delegates behavior to the object representing its current state. */
export class Order {
  private state: OrderState = new PendingOrderState();

  pay = (): this => {
    this.state.pay(this);
    return this;
  };

  ship = (): this => {
    this.state.ship(this);
    return this;
  };

  cancel = (): this => {
    this.state.cancel(this);
    return this;
  };

  getStatus = (): OrderStatus => {
    if (this.state instanceof PaidOrderState) {
      return 'paid';
    }

    if (this.state instanceof ShippedOrderState) {
      return 'shipped';
    }

    if (this.state instanceof CancelledOrderState) {
      return 'cancelled';
    }

    return 'pending';
  };

  setState = (state: OrderState): void => {
    this.state = state;
  };
}
