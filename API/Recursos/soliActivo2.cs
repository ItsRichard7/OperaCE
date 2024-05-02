namespace API.Controllers.Operador
{
    public class SolicitudActivo
    {
        public string CorreoSolicitante { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public TimeSpan HoraSolicitud { get; set; }
        public string PrimerNombre { get; set; }
        public string SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public bool? Aprobado { get; set; }
        public string ActivoPlaca { get; set; }
        public decimal UsuarioCedula { get; set; }
    }
}
