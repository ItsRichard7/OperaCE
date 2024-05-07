using System.Collections.Generic;

namespace API.Models
{
    public class OperadorAdmin
    {
        public decimal Carnet { get; set; }
        public string PNombre { get; set; }
        public string SNombre { get; set; }
        public string PApellido { get; set; }
        public string SApellido { get; set; }
        public decimal HorasTotales { get; set; }
    }
}