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

ActiveRecord::Schema[7.1].define(version: 202407230110000) do
  create_table "applications", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "recruitment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recruitment_id"], name: "index_applications_on_recruitment_id"
    t.index ["user_id"], name: "index_applications_on_user_id"
  end

  create_table "conversations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.bigint "recruitment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recruitment_id"], name: "fk_rails_3757aa0dbe"
  end

  create_table "conversations_users", id: false, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "conversation_id", null: false
    t.bigint "user_id", null: false
    t.index ["conversation_id"], name: "index_conversations_users_on_conversation_id"
    t.index ["user_id"], name: "index_conversations_users_on_user_id"
  end

  create_table "favorites", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "recruitment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recruitment_id"], name: "index_favorites_on_recruitment_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "messages", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "content"
    t.bigint "sender_id", null: false
    t.bigint "recipient_id", null: false
    t.bigint "conversation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["recipient_id"], name: "index_messages_on_recipient_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "recruitments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.datetime "event_date"
    t.datetime "deadline"
    t.integer "status", default: 0
    t.integer "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "team_id", null: false
    t.string "address"
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.index ["team_id"], name: "fk_rails_3ea6102900"
  end

  create_table "teams", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.text "details"
    t.string "profile_photo"
    t.string "background_photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "fk_rails_45096701b6"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "user_name", null: false
    t.string "profile_photo"
    t.string "background_photo"
    t.text "bio"
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "applications", "recruitments", on_delete: :cascade
  add_foreign_key "applications", "users"
  add_foreign_key "conversations", "recruitments", on_delete: :cascade
  add_foreign_key "conversations_users", "conversations", on_delete: :cascade
  add_foreign_key "conversations_users", "users"
  add_foreign_key "favorites", "recruitments", on_delete: :cascade
  add_foreign_key "favorites", "users"
  add_foreign_key "messages", "conversations", on_delete: :cascade
  add_foreign_key "messages", "users", column: "recipient_id"
  add_foreign_key "messages", "users", column: "sender_id"
  add_foreign_key "recruitments", "teams", on_delete: :cascade
  add_foreign_key "teams", "users", on_delete: :cascade
end
