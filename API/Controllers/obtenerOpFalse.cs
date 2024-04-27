using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class obtenerOpFalse : ControllerBase
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpGet]
        public IActionResult ObtenerOperadoresNoAprobados()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_operadores_no_aprob", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<Operador> operadores = new List<Operador>();

                            while (reader.Read())
                            {
                                Operador operador = new Operador
                                {
                                    Cedula = reader["cedula"].ToString(),
                                    Correo = reader["correo"].ToString(),
                                    Carnet = reader["carnet"].ToString(),
                                    PNombre = reader["p_nombre"].ToString(),
                                    SNombre = reader["s_nombre"].ToString(),
                                    PApellido = reader["p_apellido"].ToString(),
                                    SApellido = reader["s_apellido"].ToString(),
                                    FNacimiento = Convert.ToDateTime(reader["f_nacim"])
                                };

                                operadores.Add(operador);
                            }

                            return Ok(operadores);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener operadores no aprobados: {ex.Message}");
            }
        }
    }
}