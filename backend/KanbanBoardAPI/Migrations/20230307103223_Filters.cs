using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KanbanBoardAPI.Migrations
{
    /// <inheritdoc />
    public partial class Filters : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Filters",
                table: "Filters");

            migrationBuilder.DropColumn(
                name: "FilterName",
                table: "Boards");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Filters",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Filters",
                table: "Filters",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Filters_BoardId",
                table: "Filters",
                column: "BoardId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Filters",
                table: "Filters");

            migrationBuilder.DropIndex(
                name: "IX_Filters_BoardId",
                table: "Filters");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Filters");

            migrationBuilder.AddColumn<string>(
                name: "FilterName",
                table: "Boards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Filters",
                table: "Filters",
                column: "BoardId");
        }
    }
}
