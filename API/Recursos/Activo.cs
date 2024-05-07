namespace API.Recursos
{
    public class Activo
    {
        public string Placa { get; set; }
        public string Tipo { get; set; }
        public string Marca { get; set; }
        public DateTime? FCompra { get; set; }
        public bool Prestado { get; set; }
        public decimal? AprobCed { get; set; }
    }
}
