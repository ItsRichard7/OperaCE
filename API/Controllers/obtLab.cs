using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace ContosoUniversity.Controllers
{
    public class opt_laboratorios : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        public IActionResult Index()
        {
            var laboratorios = new List<Laboratorio>();

            using (var connection = new SqlConnection(connectionString))
            {
                var command = new SqlCommand("obt_laboratorios", connection);
                command.CommandType = CommandType.StoredProcedure;

                connection.Open();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        laboratorios.Add(new Laboratorio
                        {
                            Nombre = reader["nombre"].ToString(),
                            Computadoras = reader.GetInt32(1),
                            Capacidad = reader.GetInt32(2)
                        });
                    }
                }
            }

            return View(laboratorios);
        }
    }
}