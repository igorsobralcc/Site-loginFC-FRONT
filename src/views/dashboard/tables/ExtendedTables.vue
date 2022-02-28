<template>
  <v-container
    id="extended-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Simple Tables"
      link="componetns/simple-tables"
    />

    <base-material-card
      color="success"
      icon="mdi-clipboard-text"
      inline
      title="Simple Table"
      class="px-5 py-3 mb-5"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Job Position</th>
            <th>Since</th>
            <th class="text-right">
              Salary
            </th>
            <th class="text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Andrew Mike</td>
            <td>Developer</td>
            <td>2013</td>
            <td class="text-right">
              € 99,225
            </td>
            <td class="text-right">
              <v-btn
                v-for="(action, i) in actions"
                :key="i"
                class="px-2 ml-1"
                :color="action.color"
                min-width="0"
                small
              >
                <v-icon
                  small
                  v-text="action.icon"
                />
              </v-btn>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>John Doe</td>
            <td>Designer</td>
            <td>2012</td>
            <td class="text-right">
              € 89,241
            </td>
            <td class="text-right">
              <v-btn
                v-for="(action, i) in actions"
                :key="i"
                :color="action.color"
                class="px-1 ml-1"
                fab
                x-small
              >
                <v-icon v-text="action.icon" />
              </v-btn>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Alex Mike</td>
            <td>Designer</td>
            <td>2010</td>
            <td class="text-right">
              € 92,144
            </td>
            <td class="text-right">
              <v-btn
                v-for="(action, i) in actions"
                :key="i"
                :color="action.color"
                class="ml-1"
                fab
                icon
                x-small
              >
                <v-icon
                  small
                  v-text="action.icon"
                />
              </v-btn>
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>Mike Monday</td>
            <td>Marketing</td>
            <td>2013</td>
            <td class="text-right">
              € 49,990
            </td>
            <td class="text-right">
              <v-btn
                v-for="(action, i) in actions"
                :key="i"
                :color="action.color"
                class="px-1 ml-1"
                fab
                x-small
              >
                <v-icon v-text="action.icon" />
              </v-btn>
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>Paul Dickens</td>
            <td>Communications</td>
            <td>2015</td>
            <td class="text-right">
              € 69,201
            </td>
            <td class="text-right">
              <v-btn
                v-for="(action, i) in actions"
                :key="i"
                class="px-2 ml-1"
                :color="action.color"
                min-width="0"
                small
              >
                <v-icon
                  small
                  v-text="action.icon"
                />
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
    <div class="py-3" />
    <base-material-card
      color="success"
      icon="mdi-clipboard"
      inline
      title="Checked Table"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="selections"
        hide-default-footer
        show-select
      >
        <template v-slot:footer>
          <v-card-text>
            <v-row
              align="center"
              justify="end"
            >
              <strong class="title">Total</strong>

              <div class="display-1 font-weight-light ml-12">
                € 12,999
              </div>
            </v-row>
          </v-card-text>
        </template>
      </v-data-table>
    </base-material-card>
    <div class="py-3" />
    <base-material-card
      color="success"
      icon="mdi-vuetify"
      inline
      title="Shopping Cart Table"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="productHeaders"
        :items="products"
        hide-default-footer
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <v-img
                :src="item.src"
                class="mx-auto"
                max-width="75"
              />
            </td>
            <td>
              <div
                class="purple--text headline"
                v-text="item.name"
              />
              <div class="grey--text subtitle-1 font-weight-light">
                by {{ item.brand }}
              </div>
            </td>
            <td v-text="item.color" />
            <td v-text="item.size" />
            <td
              class="text-right"
              v-text="item.price"
            />
            <td />
            <td
              class="text-right"
              v-text="item.amount"
            />
          </tr>
        </template>

        <template v-slot:footer>
          <v-divider />

          <v-card-text>
            <v-row
              align="center"
              justify="end"
            >
              <strong class="title">Total</strong>

              <div class="display-1 font-weight-light ml-12">
                € 2,346
              </div>
            </v-row>
          </v-card-text>

          <v-divider />

          <div class="text-right py-6">
            <v-btn
              color="info"
              default
              rounded
              class="mr-0"
            >
              Complete Purchase
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardExtendedTables',
  }
</script>
