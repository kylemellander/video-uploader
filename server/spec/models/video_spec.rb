require 'rails_helper'

RSpec.describe Video, type: :model do
  before(:each) do
    @file = fixture_file_upload("samplevideo.mp4", 'video/mp4')
    @video = Video.new({"file" => @file, "size" => 100000})
  end

  after(:each) do
    FileUtils.rm_rf("public/test/.", secure: true)
    File.open("public/test/.keep", File::CREAT|File::TRUNC|File::RDWR, 0644)
  end

  describe "#write_file" do
    it 'should save a file' do
      @video.write_file("http://", "test.host", 80)

      expect(@video.url).to eq "http://test.host/videos/1.mp4"
      expect(File.exist?('public/test/1.mp4')).to be true
    end
  end

  describe "#increment_filename" do
    it 'should name file 1.mp4 if no other files exist' do
      filename = @video.increment_filename
      expect(filename).to eq "1.mp4"
    end

    it 'should increment filename if 1 already exists' do
      @video.write_file("", "", 80)
      filename = @video.increment_filename
      expect(filename).to eq "2.mp4"
    end
  end
end
