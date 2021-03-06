CREATE TABLE "Users" (
	"id" bigint NOT NULL,
	"name" varchar(255) NOT NULL,
	"artists_id" bigint(255) NOT NULL,
	"festivals_id" bigint(255) NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Festivals" (
	"_id" serial NOT NULL,
	"name" serial(255) NOT NULL,
	CONSTRAINT "Festivals_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Artists" (
	"id" serial NOT NULL,
	"name" serial(255) NOT NULL,
	CONSTRAINT "Artists_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Songs" (
	"_id" serial NOT NULL,
	"name" serial(255) NOT NULL,
	CONSTRAINT "Songs_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Users" ADD CONSTRAINT "Users_fk0" FOREIGN KEY ("artists_id") REFERENCES "Artists"("id");
ALTER TABLE "Users" ADD CONSTRAINT "Users_fk1" FOREIGN KEY ("festivals_id") REFERENCES "Festivals"("_id");

ALTER TABLE "Festivals" ADD CONSTRAINT "Festivals_fk0" FOREIGN KEY ("_id") REFERENCES "Artists"("id");

ALTER TABLE "Artists" ADD CONSTRAINT "Artists_fk0" FOREIGN KEY ("id") REFERENCES "Songs"("_id");


