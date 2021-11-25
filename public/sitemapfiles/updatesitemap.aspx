<%@ Page Language="C#"  Debug="true" AutoEventWireup="true" CodeFile="~/sitemapfiles/Sitemap.aspx.cs" Inherits="usedequipment.Sitemap" validateRequest="false" %>



<script runat="server">
		private string output;
	  	protected void Page_Load(object sender, EventArgs e)
	{

		output = writeToSitemap();
		Response.Write(output);

	}
</script>