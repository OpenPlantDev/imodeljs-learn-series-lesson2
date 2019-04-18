
export class ApiError extends Error {

  // using constructor shortcut for creating member variables
  constructor(public status: number, public message: string) {
    super();
  }
}

