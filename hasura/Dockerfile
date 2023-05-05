FROM hasura/graphql-engine:v2.24.1

# ENV
ENV HASURA_GRAPHQL_MIGRATIONS_DIR=/hasura-migrations
ENV HASURA_GRAPHQL_METADATA_DIR=/hasura-metadata
ENV HASURA_GRAPHQL_ENABLE_CONSOLE=true

# Copy migrations and metadata
COPY migrations /hasura-migrations
COPY metadata /hasura-metadata


EXPOSE 8080