using API.Models;
using API.Recursos;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("obt_laboratorios")]
    public class obt_laboratorios : ControllerBase
    {
        [HttpGet]
        [Route("listar")]
        public dynamic ListarLabs()
        {
            DataTable tLabs = DBDatos.Listar("obt_laboratorios");

            var labsList = new List<Labs>();

            foreach (DataRow row in tLabs.Rows)
            {
                var lab = new Labs
                {
                    nombre = row["nombre"].ToString(),
                    computadoras = Convert.ToDecimal(row["computadoras"]),
                    capacidad = Convert.ToDecimal(row["capacidad"])
                };

                labsList.Add(lab);
            }

            string JsonLabs = JsonConvert.SerializeObject(labsList);
            return new
            {
                succes = true,
                message = "Exito",
                result = new
                {
                    labs = JsonConvert.DeserializeObject<List<Labs>>(JsonLabs)
                }
            };
        }
    }
}
