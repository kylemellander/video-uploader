require 'rails_helper'
require 'tempfile'

def remove_file(loc)
  File.delete(loc)
end

describe UploadController do
  describe "#create" do
    it "returns an error when no video is attached to request" do
      post :create, {test: "test"}, {}
      errors = JSON.parse(response.body)["errors"]
      expect(errors.length).to eq 1
      expect(errors[0]["status"]).to eq "422"
      expect(errors[0]["title"]).to eq "No Attached File"
    end

    it "saves a video successfully" do
      request = {"0" => fixture_file_upload('samplevideo.mp4', 'video/mp4')}
      test_location = "public/test/samplevideo.mp4"

      post :create, request, {}
      attrs = JSON.parse(response.body)["data"]["attributes"]

      expect(attrs["url"]).to eq "#{@request.host}/videos/samplevideo.mp4"
      expect(File.exist?(test_location))

      remove_file(test_location)
    end
  end
end
