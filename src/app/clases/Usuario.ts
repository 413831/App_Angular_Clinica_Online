export class Usuario
{
    private _id;
    
    constructor(private _nombre: string, private _clave: string, private _dni: number,
        private _email: string, private _telefono: number, private _imagen: any){};

    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }
    public get imagen(): any {
        return this._imagen;
    }
    public set imagen(value: any) {
        this._imagen = value;
    }
    public get telefono(): number {
        return this._telefono;
    }
    public set telefono(value: number) {
        this._telefono = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get dni(): number {
        return this._dni;
    }
    public set dni(value: number) {
        this._dni = value;
    }
    public get clave(): string {
        return this._clave;
    }
    public set clave(value: string) {
        this._clave = value;
    }
    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }
  
}