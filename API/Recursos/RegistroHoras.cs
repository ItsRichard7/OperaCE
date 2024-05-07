using System;

namespace API.Models
{
    public class RegistroHora
    {
        public DateTime Fecha { get; set; }
        public TimeSpan HoraEntr { get; set; }
        public TimeSpan HoraSal { get; set; }
        public decimal HorasReg { get; set; }
    }
}