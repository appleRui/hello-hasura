CREATE TABLE "public"."contracts" ("id" serial NOT NULL, "url" text NOT NULL, "status" int2 NOT NULL DEFAULT 0, "property_id" integer NOT NULL, PRIMARY KEY ("id") );
