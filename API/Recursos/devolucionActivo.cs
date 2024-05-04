namespace API.Controllers.Operador
{
    public class DevolucionActivo
    {
        public string ActivoPlaca { get; set; }
        public DateTime FechaDevolucion { get; set; }
        public TimeSpan HoraDevolucion { get; set; }
        public string Averia { get; set; }
    }
}
