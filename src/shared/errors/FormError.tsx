type ComponentType = "time" | "name";

export class FormError extends Error {
  component: ComponentType;

  constructor(component: ComponentType, message: string) {
    super(message);
    this.component = component;
    this.message = message;
  }
}
