<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-icon
        small
        class="mr-2"
      >
        mdi-briefcase
      </v-icon>
      <v-toolbar-title>Tabela Gerente</v-toolbar-title>
    </v-app-bar>
    <v-data-table
      :headers="headers"
      :items="gerentes"
      sort-by="cpf"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card>
              <v-app-bar
                color="deep-purple"
                dark
              >
                <v-icon
                  small
                  class="mr-2"
                >
                  mdi-pencil
                </v-icon>
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
              </v-app-bar>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="8"
                      md="8"
                    >
                      <v-text-field
                        v-model="editedItem.nome"
                        label="Nome"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.cpf"
                        label="CPF"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <v-text-field
                        v-model="editedItem.login"
                        label="Login"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="8"
                    >
                      <v-text-field
                        v-model="editedItem.senha"
                        label="Senha"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.telefone"
                        label="Telefone"
                      />
                      <v-text-field
                        v-model="editedItem.email"
                        label="E-mail"
                      />
                      <v-text-field
                        v-model="editedItem.data_nasc"
                        label="Data de Nascimento"
                      />
                      <v-text-field
                        v-model="editedItem.nome_mae"
                        label="Nome da mãe"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-container
                        class="px-0"
                        fluid
                      >
                        <v-switch
                          v-model="editedItem.status"
                          :label="'Status: ' + (editedItem.status ? 'Ativado' : 'Desativado')"
                        />
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="red"
                  dark
                  class="mb-2"
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="green"
                  dark
                  class="mb-2"
                  @click="save"
                >
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-app-bar
                color="deep-purple"
                dark
              >
                <v-icon
                  small
                  class="mr-2"
                >
                  mdi-delete
                </v-icon>
                <v-toolbar-title>Deletar Gerente</v-toolbar-title>
              </v-app-bar>
              <v-card-title class="headline">
                <strong>Tem certeza de que deseja excluir</strong> <br><br> {{ delItem.nome }}?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="red"
                  dark
                  class="mb-2"
                  @click="closeDelete"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="green"
                  dark
                  class="mb-2"
                  @click="deleteRow(delItem)"
                >
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogSearch"
            max-width="500px"
          >
            <v-card>
              <v-app-bar
                color="deep-purple"
                dark
              >
                <v-icon
                  small
                  class="mr-2"
                >
                  mdi-magnify
                </v-icon>
                <v-toolbar-title>Pesquisar Gerente</v-toolbar-title>
              </v-app-bar>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <v-text-field
                        label="Digite sua pesquisa"
                        @click="searchItem"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="red"
                  dark
                  class="mb-2"
                  @click="closeSearch"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="green"
                  dark
                  class="mb-2"
                  @click="searchItem"
                >
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
      </template>
    </v-data-table>
    <v-speed-dial
      v-model="fab"
      bottom
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
      right
      fixed
      absolute
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-menu
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="dialog=true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="exportTable()"
      >
        <v-icon>mdi-table</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        @click="searchDialog"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>
  import GerenteDataService from '@/services/GerenteDataService'

  const excel = require('excel4node')
  const workbook = new excel.Workbook()
  const worksheet = workbook.addWorksheet('Gerentes')

  export default {
    name: 'GerenteGerente',
    data: () => ({
      status: false,
      direction: 'top',
      transition: 'slide-y-reverse-transition',
      fab: false,
      hover: false,
      delItem: '',
      gerente: '',
      dialog: false,
      dialogDelete: false,
      dialogSearch: false,
      items: [],
      search: '',
      headers: [
        { text: 'CPF', value: 'cpf' },
        { text: 'Id', value: 'id', sortable: true },
        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'nome',
          filterable: true,
        },
        { text: 'Login', value: 'login', sortable: true },
        { text: 'Situação', value: 'status' },
        { text: 'Data de nascimento', value: 'data_nasc' },
        { text: 'Data de inserção', value: 'createdAt' },
        { text: 'Data de alteração', value: 'updatedAt' },
      ],
      gerentes: [],
      usuarios: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        data_nasc: '',
        nome_mae: '',
        status: '',
        login: '',
        senha: '',
      },
      defaultItem: {
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        data_nasc: '',
        nome_mae: '',
        status: '',
        login: '',
        senha: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Cadastrar Gerente' : 'Editar Gerente'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      // this.initialize()
    },

    mounted () {
      this.getDataFromApi()
    },

    methods: {
      searchDialog () {
        this.dialogSearch = true
      },
      initialize () {
        this.gerentes = []
      },

      searchItem (item) {
        this.editedIndex = this.gerentes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogSearch = true
      },

      editItem (item) {
        this.editedIndex = this.gerentes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.gerentes.indexOf(item.id)
        this.editedItem = Object.assign({}, item.id)
        this.dialogDelete = true
        this.delItem = Object.assign({}, item)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeSearch () {
        this.dialogSearch = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        const gerenteId = this.editedItem.id
        const data = {
          nome: this.editedItem.nome,
          email: this.editedItem.email,
          cpf: this.editedItem.cpf,
          data_nasc: this.editedItem.data_nasc,
          nome_mae: this.editedItem.nome_mae,
          telefone: this.editedItem.telefone,
          login: this.editedItem.login,
          senha: this.editedItem.senha,
        }
        const val = this.formTitle.indexOf('Edit') === 0 ? 'edit' : 'save'
        if (val === 'edit') {
          await GerenteDataService.update(gerenteId, data)
            .then((res) => {
              this.alert = true
              this.alertSave = res.data.name + ' edited success'
              this.getDataFromApi()
              this.close()
              console.log('Atualizei: ', res)
            })
            .catch((res) => {
              console.log('error: ', res)
            })
        } else {
          await GerenteDataService.create(data)
            .then((res) => {
              this.alert = true
              this.alertSave = res.data.name + ' saved success'
              this.getDataFromApi()
              this.close()
              console.log('salvei: ', res)
            })
            .catch((error) => {
              this.alert = true
              this.alertSave = error.response.data.errors.id[0] + ' ' + error.response.data.message
            })
        }
      },

      async getDataFromApi () {
        this.tableLoading = true
        const data = await GerenteDataService.getAll()
        console.log('listando: ', data)
        this.gerentes = data.data
      },

      async exportTable () {
        // const data = await GerenteDataService.getAll()
        // const tableData = data.data
        // const tableString = JSON.stringify(tableData)
        // // const statusString = JSON.stringify(tableData.status)

        // // const tableRows = [tableData.cpf, tableData.email, idString, tableData.nome, tableData.nome_mae, statusString, tableData.telefone]
        // console.log('tableData aqui: ', tableData)

        const headingColumnNames = [
          'CPF',
          'Data de criação',
          'e-mail',
          'Id',
          'Nome',
          'Nome da mãe',
          'Situação',
          'Telefone',
          'Data de alteração',
        ]
        let headingColumnIndex = 1
        headingColumnNames.forEach(heading => {
          worksheet.cell(1, headingColumnIndex++).string(heading)
        })
        // let rowIndex = tableData.length
        // tableString.forEach(record => {
        //   let columnIndex = 1
        //   Object.keys(record).forEach(columnName => {
        //     worksheet.cell(rowIndex, columnIndex++)
        //       .string(record[columnName])
        //   })
        //   rowIndex++
        // })
        workbook.write('Gerentes.xlsx')
      },

      async deleteRow (item) {
        await GerenteDataService.delete(item.id)
          .then(() => {
            this.alertSave = item.name + ' deleted success'
            console.log('delete: ', item.id)
            this.alert = true
            this.dialogDelete = false
            this.getDataFromApi()
          })
          .catch((error) => {
            console.log(error)
          })
      },
      limpaForm () {
        this.editedItem.id = ''
        this.editedItem.name = ''
      },
    },
  }

</script>
