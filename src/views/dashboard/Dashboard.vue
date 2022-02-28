<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <hr v-if="statusPorteiro">
    <v-col
      v-if="statusPorteiro"
      cols="12"
      sm="12"
    >
      <h1 class="text-center">
        Área de Pesquisa
      </h1>
    </v-col>
    <v-row>
      <v-col
        v-if="statusPorteiro"
        cols="12"
        md="5"
        style="margin-top: 45px;"
      >
        <v-btn
          rounded
          color="success"
        >
          <v-icon left>
            mdi-home-variant
          </v-icon>
          Livre
        </v-btn>
        <v-btn
          rounded
          color="blue"
        >
          <v-icon left>
            mdi-home-variant
          </v-icon>
          Ocupada
        </v-btn>
        <v-btn
          rounded
          color="error"
        >
          <v-icon left>
            mdi-home-variant
          </v-icon>
          Manutentação
        </v-btn>
        <v-btn
          rounded
          color="grey"
        >
          <v-icon left>
            mdi-home-variant
          </v-icon>
          Inativa
        </v-btn>
      </v-col>
      <v-col
        v-if="statusPorteiro"
        cols="12"
        md="7"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Busca"
            single-line
            hide-details
          />
        </v-card>
      </v-col>
    </v-row>
    <hr v-if="statusPorteiro">
    <v-row v-if="statusPorteiro">
      <v-col
        cols="12"
      >
        <v-item-group multiple>
          <v-container>
            <h1 class="text-center">
              Mapa das Salas
            </h1>
            <v-row>
              <v-col
                v-for="n in salas"
                :key="n"
              >
                <v-item style="box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);">
                  <v-card
                    class="mx-auto"
                    max-width="350"
                    outlined
                    dark
                    :color="n.status == 'ativo' ? 'green' : 'grey'"
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-2">
                          Sala: {{ n.numero }}
                        </div>
                        <v-list-item-title class="headline mb-1">
                          {{ n.tipo }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{ n.chave }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn
                        rounded
                        color="white"
                      >
                        <v-icon
                          left
                          color="teal darken-4"
                        >
                          mdi-thumb-up
                        </v-icon>
                        Confirmar
                      </v-btn>
                      <v-btn
                        rounded
                        color="white"
                      >
                        <v-icon
                          left
                          color="deep-orange darken-4"
                        >
                          mdi-cancel
                        </v-icon>
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-col>
    </v-row>
    <hr v-if="statusProfessor">
    <v-row v-if="statusProfessor">
      <v-col
        cols="12"
        md="12"
        lg="12"
      >
        <h1 class="text-center">
          Professor
        </h1>
      </v-col>
      <v-col
        cols="12"
        lg="12"
      >
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Aulas dadas por mês
          </h4>
        </base-material-chart-card>
      </v-col>
    </v-row>
    <v-row v-if="statusProfessor">
      <v-item-group
        multiple
      >
        <v-container>
          <v-row>
            <v-col
              v-for="(n, index) in professor"
              :key="index"
              style="margin-bottom: -50px;"
            >
              <v-item style="box-shadow: 3px 4px 3px -1px rgba(0, 0, 0, 0.2);">
                <v-card
                  class="mx-auto"
                  max-width="300"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-1">
                        Sala: {{ n.sala_id }}
                      </div>
                      <v-list-item-title class="headline mb-1">
                        {{ n.professor }}
                      </v-list-item-title>
                      <!-- <v-list-item-subtitle>{{ n.turno }}  -  {{ n.hora }}</v-list-item-subtitle> -->
                      <v-list-item-subtitle>{{ n.dataInicio }} a {{ n.dataFim }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn
                      rounded
                      color="success"
                    >
                      <v-icon left>
                        mdi-send
                      </v-icon>
                      Pegar
                    </v-btn>
                    <v-btn
                      rounded
                      color="error"
                    >
                      <v-icon left>
                        mdi-send
                      </v-icon>
                      Devolver
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-row>
    <br>
  </v-container>
</template>
