SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;



CREATE TABLE public.people (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"artists_id" bigint,
	"festivals_id" bigint,
	CONSTRAINT "people_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.festivals (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "festivals_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.artists (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "artists_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.songs (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "songs_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE public.people ADD CONSTRAINT "people_fk0" FOREIGN KEY ("artists_id") REFERENCES public.artists("id");
ALTER TABLE public.people ADD CONSTRAINT "people_fk1" FOREIGN KEY ("festivals_id") REFERENCES public.festivals("_id");

ALTER TABLE public.festivals ADD CONSTRAINT "festivals_fk0" FOREIGN KEY ("_id") REFERENCES public.artists("id");

ALTER TABLE public.artists ADD CONSTRAINT "artists_fk0" FOREIGN KEY ("id") REFERENCES public.songs("_id");


-- Insert sample data from SongPick Api