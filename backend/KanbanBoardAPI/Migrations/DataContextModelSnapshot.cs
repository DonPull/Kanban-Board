﻿// <auto-generated />
using System;
using KanbanBoardAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace KanbanBoardAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("KanbanBoardAPI.Models.Board", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BoardOwnerId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProjectId")
                        .HasColumnType("int");

                    b.Property<int>("ProjectOriginId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BoardOwnerId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("ProjectOriginId");

                    b.HasIndex("UserId");

                    b.ToTable("Boards");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.BoardParticipant", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("BoardId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "BoardId");

                    b.HasIndex("BoardId");

                    b.ToTable("BoardParticipants");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Column", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BoardId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BoardId");

                    b.ToTable("Columns");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Filters", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BoardId")
                        .HasColumnType("int");

                    b.Property<string>("FilterName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BoardId");

                    b.ToTable("Filters");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("JoinCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.ProjectParticipant", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("ProjectId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "ProjectId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectParticipants");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Task", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BoardRefId")
                        .HasColumnType("int");

                    b.Property<int?>("ColumnId")
                        .HasColumnType("int");

                    b.Property<int>("ColumnRefId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Estimate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("OwnerRefId")
                        .HasColumnType("int");

                    b.Property<string>("Priority")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProjectRefId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimeRemainingBeforeDone")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdateTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("BoardRefId");

                    b.HasIndex("ColumnId");

                    b.HasIndex("ColumnRefId");

                    b.HasIndex("OwnerRefId");

                    b.HasIndex("ProjectRefId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.TaskAssignees", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("TaskId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "TaskId");

                    b.HasIndex("TaskId");

                    b.ToTable("TaskAssignees");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("ProfilePicture")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TokenCreated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TokenExpires")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("KanbanBoardAPI.UserDto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("UsersDto");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Board", b =>
                {
                    b.HasOne("KanbanBoardAPI.Models.User", "BoardOwner")
                        .WithMany()
                        .HasForeignKey("BoardOwnerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Boards_Users_BoardOwnerId");

                    b.HasOne("KanbanBoardAPI.Models.Project", null)
                        .WithMany("Boards")
                        .HasForeignKey("ProjectId");

                    b.HasOne("KanbanBoardAPI.Models.Project", "ProjectOrigin")
                        .WithMany()
                        .HasForeignKey("ProjectOriginId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Boards_Projects_ProjectOriginId");

                    b.HasOne("KanbanBoardAPI.Models.User", null)
                        .WithMany("OwnedBoards")
                        .HasForeignKey("UserId");

                    b.Navigation("BoardOwner");

                    b.Navigation("ProjectOrigin");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.BoardParticipant", b =>
                {
                    b.HasOne("KanbanBoardAPI.Models.Board", "Board")
                        .WithMany("BoardParticipants")
                        .HasForeignKey("BoardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KanbanBoardAPI.Models.User", "User")
                        .WithMany("BoardParticipants")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Board");

                    b.Navigation("User");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Column", b =>
                {
                    b.HasOne("KanbanBoardAPI.Models.Board", "Board")
                        .WithMany("Columns")
                        .HasForeignKey("BoardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Board");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Filters", b =>
                {
                    b.HasOne("KanbanBoardAPI.Models.Board", "Board")
                        .WithMany("Filters")
                        .HasForeignKey("BoardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Board");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Project", b =>
                {
                    b.HasOne("KanbanBoardAPI.Models.User", "User")
                        .WithMany("OwnedProjects")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.ProjectParticipant", b =>
                {
                    b.HasOne("KanbanBoardAPI.Models.Project", "Project")
                        .WithMany("ProjectParticipants")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KanbanBoardAPI.Models.User", "User")
                        .WithMany("ProjectParticipants")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("User");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Task", b =>
                {
                    b.HasOne("KanbanBoardAPI.Models.Board", "Board")
                        .WithMany("Tasks")
                        .HasForeignKey("BoardRefId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KanbanBoardAPI.Models.Column", null)
                        .WithMany("Tasks")
                        .HasForeignKey("ColumnId");

                    b.HasOne("KanbanBoardAPI.Models.Column", "Column")
                        .WithMany()
                        .HasForeignKey("ColumnRefId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("KanbanBoardAPI.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerRefId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("KanbanBoardAPI.Models.Project", "Project")
                        .WithMany("Tasks")
                        .HasForeignKey("ProjectRefId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Board");

                    b.Navigation("Column");

                    b.Navigation("Owner");

                    b.Navigation("Project");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.TaskAssignees", b =>
                {
                    b.HasOne("KanbanBoardAPI.Models.Task", "Task")
                        .WithMany("TaskAssignees")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KanbanBoardAPI.Models.User", "User")
                        .WithMany("TaskAssignees")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Task");

                    b.Navigation("User");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Board", b =>
                {
                    b.Navigation("BoardParticipants");

                    b.Navigation("Columns");

                    b.Navigation("Filters");

                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Column", b =>
                {
                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Project", b =>
                {
                    b.Navigation("Boards");

                    b.Navigation("ProjectParticipants");

                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.Task", b =>
                {
                    b.Navigation("TaskAssignees");
                });

            modelBuilder.Entity("KanbanBoardAPI.Models.User", b =>
                {
                    b.Navigation("BoardParticipants");

                    b.Navigation("OwnedBoards");

                    b.Navigation("OwnedProjects");

                    b.Navigation("ProjectParticipants");

                    b.Navigation("TaskAssignees");
                });
#pragma warning restore 612, 618
        }
    }
}
