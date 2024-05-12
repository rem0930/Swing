# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_12_101251) do
  create_table "locations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.decimal "latitude", precision: 10, scale: 8, null: false
    t.decimal "longitude", precision: 11, scale: 8, null: false
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
  end

  create_table "recruitments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.bigint "location_id", null: false
    t.datetime "event_date"
    t.datetime "deadline"
    t.integer "status", default: 0
    t.integer "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "team_id", null: false
    t.index ["location_id"], name: "index_recruitments_on_location_id"
    t.index ["team_id"], name: "fk_rails_3ea6102900"
  end

  create_table "teams", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.text "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "profile_photo"
    t.string "background_photo"
    t.index ["user_id"], name: "index_teams_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "user_name", null: false
    t.string "profile_photo"
    t.string "background_photo"
    t.text "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "location_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["location_id"], name: "index_users_on_location_id"
  end

  add_foreign_key "recruitments", "locations"
  add_foreign_key "recruitments", "teams"
  add_foreign_key "teams", "users"
  add_foreign_key "users", "locations"
end
