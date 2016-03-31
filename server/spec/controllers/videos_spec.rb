require 'rails_helper'
require 'tempfile'

describe VideosController do
  after(:each) do
    FileUtils.rm_rf("public/test/.", secure: true)
    File.open("public/test/.keep", File::CREAT|File::TRUNC|File::RDWR, 0644)
  end

  describe "#create" do
    it "returns an error when no video is attached to request" do
      post :create, {test: "test"}, {}
      errors = JSON.parse(response.body)["errors"]["file"]
      expect(errors.count).to eq 1
      expect(response.status).to eq 422
      expect(errors[0]).to eq "There was no file attached to upload."
    end

    it "returns an error when a non-video is attached" do
      request = {"0" => fixture_file_upload('test.txt', 'plain/txt')}
      post :create, request, {}
      errors = JSON.parse(response.body)["errors"]["file"]
      expect(errors.count).to eq 1
      expect(response.status).to eq 422
      expect(errors[0]).to eq "There was no file attached to upload."
    end

    it "saves a video successfully" do
      request = {"file" => fixture_file_upload('samplevideo.mp4', 'video/mp4'), "size" => 100000}
      test_location = "public/test/1.mp4"

      post :create, request, {}
      attrs = JSON.parse(response.body)["data"]["attributes"]

      expect(attrs["url"]).to eq "#{@request.protocol}#{@request.host}/videos/1.mp4"
      expect(File.exist?(test_location))
    end

    it "increments filename when there is a duplicate" do
      test_location = "public/test/1.mp4"
      File.open(test_location, File::CREAT|File::TRUNC|File::RDWR, 0644)
      request = {"file" => fixture_file_upload('samplevideo.mp4', 'video/mp4'), "size" => 100000 }

      post :create, request, {}
      attrs = JSON.parse(response.body)["data"]["attributes"]

      expect(attrs["url"]).to eq "#{@request.protocol}#{@request.host}/videos/2.mp4"
    end
  end
end
