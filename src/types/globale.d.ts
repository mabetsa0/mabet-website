declare global {
  interface Window {
    TabbyPromo: any
  }
}

// Optionally, you can define the class interface if you know its structure
declare class TabbyPromo {
  constructor(options: any)
  // Define methods and properties if known
}

export {}
