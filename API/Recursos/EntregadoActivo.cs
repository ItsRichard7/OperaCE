namespace API.Controllers.Operador
{
    public class EntregaActivo
    {
        public string CorreoSolicitante { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public TimeSpan HoraSolicitud { get; set; }
    }
}
