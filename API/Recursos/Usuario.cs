namespace API.Recursos
{
    public class Usuario
    {
        public Usuario(decimal cedula, string correo, string contrasena, decimal? carnet, string p_nombre, string s_nombre, string p_apellido, string s_apellido, DateTime f_nacim)
        {
            Cedula = cedula;
            Correo = correo;
            Contrasena = contrasena;
            Carnet = carnet;
            P_nombre = p_nombre;
            S_nombre = s_nombre;
            P_apellido = p_apellido;
            S_apellido = s_apellido;
            F_nacim = f_nacim;
        }

        public decimal Cedula { get; set; }
        public string Correo { get; set; }
        public string Contrasena { get; set; }
        public decimal? Carnet { get; set; }
        public string P_nombre { get; set; }
        public string S_nombre { get; set; }
        public string P_apellido { get; set; }
        public string S_apellido { get; set; }
        public DateTime F_nacim { get; set; }
    }
}
