public class SoliAct
{
    public string CorreoSoli { get; set; }
    public bool Aprobado { get; set; }
    public DateTime FechaSoli { get; set; }
    public TimeSpan HoraSoli { get; set; }
    public string PNombre { get; set; }
    public string SNombre { get; set; }
    public string PApellido { get; set; }
    public string SApellido { get; set; }
    public DateTime? FechaDev { get; set; }
    public TimeSpan? HoraDev { get; set; }
    public bool Devuelto { get; set; }
    public bool Entregado { get; set; }

    public string? Averia { get; set; }
    public string ActPlaca { get; set; }
    public decimal UserCed { get; set; }
}