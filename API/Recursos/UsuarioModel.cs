namespace API.Recursos
{
    public class UsuarioModel
    {
        public decimal Cedula { get; set; }
        public string Correo { get; set; }
        public string Contrasena { get; set; }
        public decimal? Carnet { get; set; }
        public string PrimerNombre { get; set; }
        public string? SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string? SegundoApellido { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public bool Activo { get; set; }
        public decimal RolId { get; set; }
    }
}
