﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Operador
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObtenerActivosNoDevueltosController : ControllerBase
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpGet]
        public IActionResult ObtenerActivosNoDevueltos()
        {
            try
            {
                List<SolicitudActivo> activosNoEntregados = new List<SolicitudActivo>();

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_act_no_devueltos", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                SolicitudActivo activo = new SolicitudActivo
                                {
                                    PrimerNombre = reader["p_nombre"].ToString(),
                                    SegundoNombre = reader["s_nombre"].ToString(),
                                    PrimerApellido = reader["p_apellido"].ToString(),
                                    SegundoApellido = reader["s_apellido"].ToString(),
                                };

                                activosNoEntregados.Add(activo);
                            }
                        }
                    }
                }

                return Ok(activosNoEntregados);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener los activos no entregados: {ex.Message}");
            }
        }
    }
}
