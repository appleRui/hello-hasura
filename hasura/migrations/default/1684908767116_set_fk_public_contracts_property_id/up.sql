alter table "public"."contracts"
  add constraint "contracts_property_id_fkey"
  foreign key ("property_id")
  references "public"."properties"
  ("id") on update restrict on delete restrict;
