using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Xml.Linq;

namespace usedequipment {
	public partial class Sitemap : System.Web.UI.Page { 

		protected void Page_Load (object sender, EventArgs e) {

		}
		public string writeToSitemap () {

			if (Request.Form["mapxml"] != null) {
				string xml = HttpUtility.UrlDecode (Request.Form["mapxml"]);
				if (ValidateXml (xml)) {
					
					using (StreamWriter outputFile = new StreamWriter (Server.MapPath ("~/sitemap.xml"))) {
						outputFile.Write(xml); //update the sitemap file
						return "Sitemap updated successfully!!";
					}
					
				} else {
					return "Error occured. XML invalid, sitemap not updated";
				}

			} else {
				return "Not updated, no post detected";
			} 

		}

		public static bool ValidateXml (string xml) {
			try {
				XmlDocument doc = new XmlDocument ();
				doc.LoadXml (xml); // possible error thrown here if invalid xml
				return true;
			} catch {
				return false;
			}
		} 
	}
}